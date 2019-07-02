import { generateSecret, sendSecretmail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      console.log(request.user);

      const { email } = args;
      const loginSecret = generateSecret();
      try {
        throw Error();
        await sendSecretmail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
