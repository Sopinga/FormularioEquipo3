import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { PersonaType, PersonaPostSchema, PersonaPostType } from "../../tipos/persona.js";

const personas: PersonaType[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@example.com",
    cedula: "3.456.789-0",
    rut: "123456789123",
  },
];
//con este set se pone la id de la persona y así sabemos que no se repite
const deletedIds: Set<number> = new Set<number>();
//obtener todas las personas
const personaRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): Promise<void> => {
  fastify.get("/", {
    handler: async function (request, reply) {
      return personas;
    },
  });

  // crear persona
  fastify.post("/", {
    schema: {
      body: PersonaPostSchema,
    },
    handler: async function (request, reply) {
      const personaPost = request.body as PersonaPostType;
      // Asignar ID: usar un ID de deletedIds si está disponible, o generar uno nuevo
      const id = deletedIds.size > 0
        ? Array.from(deletedIds)[0] // Get one deleted ID
        : personas.length > 0
          ? Math.max(...personas.map(p => p.id)) + 1 // Generate new ID
          : 1; // Starting ID

      personaPost.id = id;

      // Remove the ID from deletedIds set if it's being reused
      deletedIds.delete(id);

      personas.push(personaPost);

      if (!personaPost.id) {
        reply.code(500).send({ message: "No se pudo crear la persona" });
        return;
      }
      return personaPost;
    }
  });
  // Ruta para eliminar una persona
  fastify.delete("/:id/eliminar", {
    handler: async function (request, reply) {
      const { id } = request.params as { id: string };
      const index = personas.findIndex((p) => p.id === parseInt(id));
      if (index === -1) {
        reply.code(404).send({ message: "Persona no encontrada" });
        return;
      }

      // Añadir el ID a deletedIds en lugar de eliminar la persona del array
      const deletedPerson = personas.splice(index, 1)[0];
      //aviso de que se ha eliminado
      deletedIds.add(deletedPerson.id);
      return { message: "Persona eliminada", deletedPerson };
    },
  });
  // Ruta para editar una persona
  fastify.put("/:id/editar", {
    schema: {
      body: PersonaPostSchema,
    },
    handler: async function (request, reply) {
      const { id } = request.params as { id: string };
      const updatedPersona = request.body as PersonaPostType;
      const index = personas.findIndex((p) => p.id === parseInt(id));
      if (index === -1) {
        reply.code(404).send({ message: "Persona no encontrada" });
        return;
      }
      personas[index] = { ...personas[index], ...updatedPersona, id: parseInt(id) };
      return personas[index];
    },
  });

  // Ruta para ver los datos de una persona específica
  fastify.get("/:id/ver", {
    handler: async function (request, reply) {
      const { id } = request.params as { id: string };
      const persona = personas.find((p) => p.id === parseInt(id));
      if (!persona) {
        reply.code(404).send({ message: "Persona no encontrada" });
        return;
      }
      return persona;
    },
  });
};

export default personaRoute;
