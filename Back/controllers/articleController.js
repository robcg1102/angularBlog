const validator = require("validator");
const Article = require("../models/Article");

const fs = require("fs");
const path = require("path");
const { exists } = require("../models/Article");

const controller = {
  datosCurso: (req, res) => {
    const { hola } = req.body;
    return res.status(200).send({
      status: "OK",
      hola,
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la acción test",
    });
  },

  save: (req, res) => {
    // title, content, image
    const params = req.body;

    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    if (validate_title && validate_content) {
      var article = new Article();
      article.title = params.title;
      article.content = params.content;
      article.image = null;

      article.save((err, articleStore) => {
        if (err || !articleStore) {
          return res.status(404).send({
            status: "error",
            message: "El artículo no se ha guardado",
          });
        }
        return res.status(200).send({
          status: "success",
          article: articleStore,
        });
      });
    } else {
      return res.status(200).send({
        status: "error",
        message: "Los datos no son válidos",
      });
    }
  },

  getArticles: (req, res) => {
    const query = Article.find({});
    const last = req.params.last;
    if (last || last !== undefined) {
      query.limit(5);
    }

    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los artículos!!",
        });
      }
      if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "No hay artículos para mostrar!!",
        });
      }

      return res.status(200).send({
        status: "success",
        articles,
      });
    });
  },

  getArticle: (req, res) => {
    const articleId = req.params.id;

    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        message: "No existe el artículo",
      });
    }

    Article.findById(articleId, (err, article) => {
      if (err || !article) {
        return res.status(404).send({
          status: "error",
          message: "No existe el artículo",
        });
      }
      return res.status(200).send({
        status: "success",
        article,
      });
    });
  },

  update: (req, res) => {
    const articleId = req.params.id;

    const params = req.body;
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(404).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    if (validate_title && validate_content) {
      Article.findOneAndUpdate(
        { _id: articleId },
        params,
        { new: true },
        (err, articleUpdated) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: "Error al actualizar",
            });
          }
          if (!articleUpdated) {
            return res.status(500).send({
              status: "error",
              message: "No existe el artículo",
            });
          }
          return res.status(500).send({
            status: "success",
            article: articleUpdated,
          });
        }
      );
    } else {
      return res.status(200).send({
        status: "error",
        message: "La validación no es correcta",
      });
    }
  },

  delete: (req, res) => {
    const articleId = req.params.id;

    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar",
        });
      }
      if (!articleRemoved) {
        return res.status(500).send({
          status: "error",
          message: "No se ha borrado el artículo, error",
        });
      }

      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    });
  },

  upload: (req, res) => {
    var file_name = "Imagen no subida...";

    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }

    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");

    var file_name = file_split[2];

    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];

    if (
      file_ext != "png" &&
      file_ext != "jpg" &&
      file_ext != "jpeg" &&
      file_ext != "gif"
    ) {
      fs.unlink(file_path, (err) => {
        return res.status(200).send({
          status: "error",
          message: "La extensión de la imagen no es válida",
        });
      });
    } else {
      const articleId = req.params.id;
      Article.findOneAndUpdate(
        { _id: articleId },
        { image: file_name },
        { new: true },
        (err, articleUpdated) => {
          if (err || !articleUpdated) {
            return res.status(200).send({
              status: "error",
              message: "Error al guardar la imagen de artículo",
            });
          }

          return res.status(200).send({
            status: "success",
            article: articleUpdated,
          });
        }
      );
    }
  },

  getImage: (req, res) => {
    const file = req.params.image;
    const path_file = "./upload/articles/" + file;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({
          status: "error",
          message: "La imagen no existe",
        });
      }
    });
  },

  search: (req, res) => {
    const searchString = req.params.search;
    Article.find({
      "$or": [
        { "title": { "$regex": searchString, "$options": "i" } },
        { "content": { "$regex": searchString, "$options": "i" } },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, articles) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error en la petición",
          });
        }
        if (!articles || articles.length === 0) {
          return res.status(404).send({
            status: "error",
            message: "No hay artículos que coincidan con tu búsqueda",
          });
        }
        return res.status(200).send({
          status: "success",
          articles,
        });
      });
  },
};

module.exports = controller;
