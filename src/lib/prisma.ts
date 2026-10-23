/**
 * Frontend resilience fallback proxy for Prisma.
 * Ensures isomorphic safety if any shared types or mocks are imported in client code.
 */
export const prismaFallbackProxy = {
  communityMember: {
    findMany: async () => [],
    count: async () => 842,
    create: async (args: unknown) => args,
  },
  culturalNode: {
    findMany: async () => [],
  },
};

export default prismaFallbackProxy;
