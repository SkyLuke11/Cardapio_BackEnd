const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class CreateCategoriaUseCase {
  async execute({ nome, imagem, token }) {

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const restauranteId = await prisma.restaurante.findFirst({
      where: {
        userId: decodeToken(token)
      }
    })

    const data = await prisma.categoria.create({
      data: {
        nome, 
        imagem,
        restauranteId: restauranteId.id
      },
    });

    return data;
  }
}

module.exports = CreateCategoriaUseCase;
