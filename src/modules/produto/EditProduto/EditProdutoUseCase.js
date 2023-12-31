const { hash, compare } = require("bcrypt");
const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class EditProdutoUseCase {
  async execute({ code, ativado, id, nome, nomesAdd, preco, precosAdd, descricao, imagem, categoriaId, token }) {

    if (!id) {
      throw new AppError("ID não existente.");
    }

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const data = await prisma.produto.findFirst({
      where: {
        id
      },
    });

    if (!data) {
      throw new AppError("Produto não existente.");
    }

    if (code != undefined && code != '') {

      const restaurante = await prisma.restaurante.findFirst({
        where: {
          userId: decodeToken(token)
        }
      })
  
      const codeExists = await prisma.produto.findFirst({
        where: {
          code,
          restauranteId: restaurante.id
        },
      });
  
      if ((codeExists) && id != codeExists.id) {
        throw new AppError("Este código já está sendo usado por algum produto em seu restaurante.")
      }

      data.code = Number(code)
    }

    

    if (nome != undefined && nome != '') {
      data.nome = nome
    }

    if (ativado != undefined && ativado != null) {
      data.ativado = ativado
    }
      
    data.nomesAdd = nomesAdd

    if (preco != undefined && preco != '') {
      data.preco = Number(preco)
    } else {
      data.preco = null
    }
      
    data.precosAdd = precosAdd

    if (descricao != undefined && descricao != '') {
      data.descricao = descricao
    }

    if (imagem != undefined && imagem != '') {
      data.imagem = imagem
    }
    
    if (categoriaId != undefined && categoriaId != '') {
      data.categoriaId = categoriaId
    }

    const produtoAtualizada = await prisma.produto.update({
      where: {
        id: data.id
      },
      data: data
    });

    return produtoAtualizada;
  }
}

module.exports = EditProdutoUseCase;
