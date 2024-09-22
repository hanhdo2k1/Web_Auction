import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import '../style/category.scss';
import { formatCurrency, formatDateTime, formatDateTime2 } from '../../../untils/utils';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cateID, setCategoryId] = useState('');
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    productName: '',
    thumbnail: [],
    category: '',
    description: '',
    price: '',
    startDate: ''
  });
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);


  //lấy product
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8111/product/admin/all');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  //lấy category
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8111/category/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  //chọn danh mục
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setCurrentProduct({
      ...currentProduct,
      cateID
    });
  };

  //chọn ảnh
  const handleThumbnailChange = (e) => {
    setThumbnailFiles([...e.target.files]);
  };

  //thêm
  const handleAddClick = () => {
    setCurrentProduct({
      id: '',
      productName: '',
      thumbnail: [],
      category: '',
      description: '',
      price: '',
      startDate: ''
    });
    setIsEditing(false);
    setShowModal(true);
  };

  //sửa
  const handleEditClick = (product) => {
    setCategoryId(product.categoryId)
    setCurrentProduct(product);
    currentProduct.category = cateID
    console.log(currentProduct.category)
    setIsEditing(true);
    setShowModal(true);
  };

  //xóa
  const handleDeleteClick = (product) => {
    setDeleteProduct(product);
    setShowDeleteModal(true);
  };

  //lưu
  const handleSave = async () => {
    const formData = new FormData();
    formData.append('productName', currentProduct.productName);
    thumbnailFiles.forEach(file => {
      formData.append('files', file);
    });
    formData.append('categoryId', cateID);
    formData.append('description', currentProduct.description);
    formData.append('price', currentProduct.price);
    formData.append('startDate', formatDateTime(currentProduct.startDate));

    try {
      formData.append('id', currentProduct.id)
      if (isEditing) {
        await axios.put(`http://localhost:8111/product/admin/update`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:8111/product/admin/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  //xóa
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8111/product/admin/delete/${deleteProduct.id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="category">
      <h2>Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Product Name</th>
            <th>Thumbnail</th>
            {/* <th>Category</th> */}
            <th>Description</th>
            <th>Price</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td><img src={`http://localhost:8111/image/${product.thumbnail}`} alt={product.productName} width="50" /></td>
              {/* <td>{product.category}</td> */}
              <td>{product.description}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>{formatDateTime(product.startDate)}</td>
              <td>
                <Button variant="success" className="edit-btn" onClick={() => handleEditClick(product)}>
                  Edit
                </Button>
                <Button variant="danger" className="delete-btn" onClick={() => handleDeleteClick(product)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" className="add-btn" onClick={handleAddClick}>
        Add Product
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={currentProduct.productName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formThumbnail">
              <Form.Label>Thumbnails</Form.Label>
              <Form.Control
                type="file"
                name="thumbnails"
                multiple
                onChange={handleThumbnailChange}
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={currentProduct.category}
                required
                onChange={handleCategoryChange}
              >
                <option>Bạn hãy chọn danh mục</option>
                {categories.map((category, index) => (
                  <option
                    selected={(category.id + "") === (cateID + "") ? "selected" : ""}
                    key={index}
                    value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                value={formatDateTime2(currentProduct.startDate)}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Products