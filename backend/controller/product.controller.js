import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import authModel from "../models/auth.model.js";

// get all products - product search by query - product filter by price - asc - dsc
export const getAllProductController = async (req, res) => {
  try {
    // take a request from req.query
    const { asc, dsc } = req.query || "";

    // take the query from req.query
    const query = req.query.search || "";

    // Build filter for search
    let filter = {};

    if (query) {
      filter = {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { brandName: { $regex: query, $options: "i" } },
        ],
      };
    }

    // Build sort option if asc or dsc is present
    let sortOption = {};

    if (asc) {
      sortOption.price = 1;
    } else if (dsc) {
      sortOption.price = -1;
    }

    // Query products with filter and sorting
    const products = await productModel.find(filter).sort(sortOption);

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: query
          ? "No products found matching your search."
          : "No products available.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get a single product by its details
export const productByIdController = async (req, res) => {
  try {
    // take id from req.params
    const { id } = req.params;

    // if not Id then
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is missing",
      });
    }

    // if id is invalid mongoDb Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product Id",
      });
    }

    // if find product by id then
    const findProduct = await productModel.findById(id);

    // if findProduct not exist or length is equal to 0 then
    if (!findProduct || findProduct.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    // return a success message
    return res.status(200).json({
      success: true,
      message: "Product Details fetch successfully",
      data: findProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete the product by it id
export const deleteProductByIdController = async (req, res) => {
  try {
    // take id from req.params
    const { id } = req.params;

    // take a loggedIn user from req.user._id
    const loggedInUser = req.user._id;

    // if not found loggedInUser
    if (!loggedInUser) {
      return res.status(403).json({
        success: false,
        message: "User id is missing.",
      });
    }

    // check the id is mongoose type or not
    if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
      return res.status(403).json({
        success: false,
        message: "Invalid mongoDb Id format.",
      });
    }

    // if id is missing
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is missing",
      });
    }

    // if mongoDb id is missing
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(403).json({
        success: false,
        message: "Invalid mongoDb Id.",
      });
    }

    // check product is exist or not
    const productExist = await productModel.findById(id);

    // if product is not exist
    if (!productExist) {
      return res.status(400).json({
        success: false,
        message: "Product not found.",
      });
    }

    // check the seller id is same to loggedIn user id and it is admin
    if (productExist.sellerId.toString() !== loggedInUser.toString()) {
      return res.status(403).json({
        success: false,
        message: "Logged in user Id does not match product owner",
      });
    }

    // delete images from cloudinary
    try {
      for (const image of productExist.images) {
        if (image.public_id) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
    } catch (cloudErr) {
      return res.status(500).json({
        success: false,
        message: "Image deletion failed from Cloudinary. Product not deleted.",
        error: cloudErr.message,
      });
    }

    // delete product from Db
    const deleteProduct = await productModel.findByIdAndDelete(id);

    // if not delete
    if (!deleteProduct) {
      return res.status(400).json({
        success: false,
        message: "product not deleted",
      });
    }

    // return a success message
    return res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// add all the product
export const addProductController = async (req, res) => {
  try {
    // take all the req from req.body
    const {
      name,
      description,
      productDetails,
      price,
      category,
      highlights,
      bestSeller,
      size,
      brandName,
      returnPolicy,
      stock,
      rating
    } = req.body;

    // take all the images from req.files
    const images = req.files;

    // if no images or its length should be 0
    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required.",
      });
    }

    // store the logged in user from req.user._id
    const loggedInUser = req.user._id;

    // if not loggedInUser then
    if (!loggedInUser) {
      return res.status(400).json({
        success: false,
        message: "Id is missing.",
      });
    }

    // check the mongoDb id is invalid then
    if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized - User",
      });
    }

    // check the user exist in Db from loggedInUser
    const userExist = await authModel.findById(loggedInUser);

    // if user not exist then
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    // map the files that is uploaded on the cloudinary
    const uploadAllImages = images.map((img) => ({
      public_id: img.filename,
      url: img.path,
    }));

    // create a new instances of productModel and store all the variable
    const product = new productModel({
      name,
      description,
      productDetails,
      price,
      category,
      highlights,
      bestSeller,
      sellerId: loggedInUser,
      sellerName: req.user.name,
      size,
      images: uploadAllImages,
      brandName,
      returnPolicy,
      stock,
      rating
    });

    // save the data by using mongoDb save()  method
    const data = await product.save();

    // return a success message and send the uploaded data
    return res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get all the unique categories find from db
export const allUniqueCategoriesController = async (req, res) => {
  try {
    // find all the unique categories by distinct and pass the db of field
    const category = await productModel.distinct("category");

    // if no category found or category length should be 0
    if (!category || category.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Category found.",
      });
    }

    // return a success message
    return res.status(200).json({
      success: true,
      message: "Data fetch successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get all the unique brand find from db
export const allUniqueBrandController = async (req, res) => {
  try {
    // find all the unique brand by distinct method and pass the Db field
    const brand = await productModel.distinct("brandName");

    // if no brand found or its length should be 0 then
    if (!brand || brand.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Brand found.",
      });
    }

    // return a success message and send the data
    return res.status(200).json({
      success: true,
      message: "Data fetch successfully",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get all the product of that categories
export const getAllCategoriesProduct = async (req, res) => {
  try {
    const { category } = req.params;

    const { asc, dsc } = req.query || "";

    const query = req.query.search || "";

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category params are missing",
      });
    }

    let sortOption = {};

    if (asc) {
      sortOption.price = 1;
    } else if (dsc) {
      sortOption.price = -1;
    }

    let filter = { category };

    if (query) {
      filter.$or = [
        {
          name: { $regex: query, $options: "i" },
        },
      ];
    }

    const findAllCategoryFound = await productModel
      .find(filter)
      .sort(sortOption);

    if (!findAllCategoryFound || findAllCategoryFound === 0) {
      return res.status(400).json({
        success: false,
        message: "No Product found for this categroy",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data fetch successfully",
      data: findAllCategoryFound,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get all the product of that brand
export const getAllBrandProduct = async (req, res) => {
  try {
    const { brand } = req.params;

    const { asc, dsc } = req.query || "";

    const query = req.query.search || "";

    if (!brand) {
      return res.status(400).json({
        success: false,
        message: "brandName params are missing",
      });
    }

    let sortOption = {};

    if (asc) {
      sortOption.price = 1;
    } else if (dsc) {
      sortOption.price = -1;
    }

    let filter = { brandName: brand };

    if (query) {
      filter.$or = [
        {
          name: { $regex: query, $options: "i" },
        },
      ];
    }

    const findAllBrandFound = await productModel.find(filter).sort(sortOption);

    if (!findAllBrandFound || findAllBrandFound === 0) {
      return res.status(400).json({
        success: false,
        message: "No Product found for this brand",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data fetch successfully",
      data: findAllBrandFound,
    });
  } catch (error) { }
};

// get all the best seller product
export const bestSellerController = async (req, res) => {
  try {
    // find all the bestSeller product
    const bestSeller = await productModel.find({ bestSeller: true });

    // if no data found then
    if (!bestSeller || bestSeller.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At that time no one product is best selling item",
        data: bestSellerProduct,
      });
    }

    // return a success message
    return res.status(200).json({
      success: true,
      message: "Data fetch successfully",
      data: bestSeller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
