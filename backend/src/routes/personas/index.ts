import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { PersonaPutSchema, PersonaPutType, PersonaPostType, PersonaPostSchema, PersonaIdSchema } from "../../tipos/persona.js";
import { query } from "../../services/database.js";

// Definición del plugin de ruta
const personaRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): Promise<void> => {
  // Ruta para obtener todas las personas
  fastify.get("/", {
    schema: {
      tags: ["persona"],
    },
    preHandler: [fastify.authenticate],
    handler: async function (request, reply) {
      const res = await query(`SELECT
        id,
        nombre,
        apellido,
        email,
        cedula,
        rut
        FROM personas`);
      if (res.rows.length === 0) {
        reply.code(404).send({ message: "No hay personas registradas" });
        return;
      }
      return res.rows;
    }
  });

  // Ruta para crear una nueva persona
  fastify.post("/", {
    schema: {
      params: PersonaPostSchema,
      tags: ["persona"],
      description: "Crea una nueva persona",
    },
    preHandler: [fastify.authenticate],
    handler: async function (request, reply) {
      const personaPost = request.body as PersonaPostType;
      const res = await query(`INSERT INTO personas
            (nombre, apellido, email, cedula, rut, contrasena)
            VALUES
            ('${personaPost.nombre}', 
            '${personaPost.apellido}', 
            '${personaPost.email}', 
            '${personaPost.cedula}', 
            '${personaPost.rut}', 
            '${personaPost.contrasena}')
            RETURNING id;`);
      const id = res.rows[0].id;
      if (res.rows.length === 0) {
        reply.code(404).send({ message: "Persona no creada" });
        return;
      }
      reply.code(201).send({ ...personaPost, id });
    }
  });

  // Ruta para eliminar una persona
  fastify.delete("/:id", {
    schema: {
      tags: ["persona"],
      description: "Elimina una persona por ID",
      params: PersonaIdSchema,
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
            id: { type: "string" }
          }
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    preHandler: [fastify.authenticate],
    handler: async function (request, reply) {
      const { id } = request.params as { id: string };
      const res = await query(`DELETE FROM personas WHERE id = ${id};`);
      if (res.rowCount === 0) {
        reply.code(404).send({ message: "Persona no encontrada" });
        return;
      }
      reply.code(200).send({ message: "Persona eliminada", id });
    }
  });

  // Ruta para editar una persona
  fastify.put("/:id", {
    schema: {
      tags: ["persona"],
      description: "Actualiza una persona por ID",
      params: PersonaIdSchema,
      body: PersonaPutSchema,
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            nombre: { type: "string" },
            apellido: { type: "string" },
            email: { type: "string" },
            cedula: { type: "string" },
            rut: { type: "string" }
          }
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    preHandler: [fastify.authenticate],
    handler: async function (request, reply) {
      const { id } = request.params as { id: string };
      const personaPut = request.body as PersonaPutType;
      const res = await query(`UPDATE personas
        SET nombre = '${personaPut.nombre}',
        apellido = '${personaPut.apellido}',
        email = '${personaPut.email}',
        cedula = '${personaPut.cedula}',
        rut = '${personaPut.rut}'
        WHERE id = ${id}
        RETURNING id;`);
      if (res.rows.length === 0) {
        reply.code(404).send({ message: "Persona no encontrada" });
        return;
      }
      reply.code(200).send({ ...personaPut, id });
    }
  });

  // Ruta para ver los datos de una persona específica
  fastify.get("/:id", {
    schema: {
      tags: ["persona"],
      description: "Obtiene los detalles de una persona por ID",
      params: PersonaIdSchema,
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            nombre: { type: "string" },
            apellido: { type: "string" },
            email: { type: "string" },
            cedula: { type: "string" },
            rut: { type: "string" }
          }
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    preHandler: [fastify.authenticate],
    handler: async function (request, reply) {
      const { id } = request.params as { id: string };
      const res = await query(`SELECT 
        id,
        nombre,
        apellido,
        email,
        cedula,
        rut
        FROM personas WHERE id = ${id};`);

      if (res.rows.length === 0) {
        reply.code(404).send({ message: "Persona no encontrada" });
        return;
      }
      const persona = res.rows[0];
      return persona;
    }
  });

  fastify.post("/login", {
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" }
        },
        required: ["email", "password"]
      }
    },
    handler: async function (request, reply) {
      const { email, password } = request.body as { email: string, password: string };

      // Busca el usuario en la base de datos
      const res = await query(`SELECT * FROM personas WHERE email = '${email}' AND contrasena = '${password}';`);

      if (res.rows.length === 0) {
        return reply.code(401).send({ message: "Credenciales inválidas" });
      }

      const user = res.rows[0];

      // Genera el token JWT
      const token = fastify.jwt.sign({ id: user.id, email: user.email });

      // Envía el token al cliente
      reply.send({ token });
    }
  });


};

export default personaRoute;
