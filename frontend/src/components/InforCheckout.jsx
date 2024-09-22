import React, { useState } from 'react';
import { Button, message, Radio, Steps, theme } from 'antd';
import { Form, Input, Space } from 'antd';
import '../style/inforcheckout.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: 'Liên hệ',
    content: 'contact',
  },
  {
    title: 'Vận chuyển',
    content: 'transport',
  },
  {
    title: 'Thanh toán',
    content: 'payment',
  },
];


function InforCheckout() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact: {},
    transport: {},
    payment: {},
  });

  const [form] = Form.useForm();

  const next = () => {
    form
      .validateFields()
      .then(values => {
        const updatedFormData = { ...formData };
        updatedFormData[steps[current].content] = values;
        setFormData(updatedFormData);
        setCurrent(current + 1);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
    form.resetFields();
    form.setFieldsValue(formData[steps[current - 1].content]);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    textAlign: 'left',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  const handleFinish = async values => {
    const updatedFormData = { ...formData, payment: values };
    setFormData(updatedFormData);
    message.success('Processing complete!');
    console.log(updatedFormData);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const username = user.username;
    try {
      const response = await axios.post('http://localhost:8111/order/add', {
        fullName: updatedFormData.contact.fullname,
        address: updatedFormData.transport.address,
        phoneNumber: updatedFormData.contact.phoneNumber,
        shippingMethod: updatedFormData.transport.shipping,
        paymentMethod: updatedFormData.payment.paymentMethod,
        note: updatedFormData.contact.note,
        username: username,
      }
      );
      if (response.data.httpStatus === 200) {
        console.log(response)
        alert("Đặt hàng thành công")
        navigate("/dathang")
      }
      if (response.data.status === 400) {
        alert("Lỗi rồi");
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <div className='infor-checkout'>
      <>
        <Steps current={current} items={items} />
        <div style={contentStyle}>
          {
            (steps[current].content) === 'contact' && (
              <div className="contact">
                <Form
                  form={form}
                  name="wrap"
                  onFinish={next}
                  labelCol={{
                    flex: '110px',
                  }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={formData.contact}
                >
                  <Form.Item
                    label="Họ và tên"
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập họ và tên',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập email',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Ghi chú"
                    name="note"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Next
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )
          }
        </div>

        <div style={contentStyle}>
          {
            (steps[current].content) === 'transport' && (
              <div className="transport">
                <Form
                  form={form}
                  name="wrap"
                  onFinish={next}
                  labelCol={{
                    flex: '110px',
                  }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={formData.transport}
                >
                  <Form.Item
                    label="Loại shipping"
                    name="shipping"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn loại vận chuyển',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={"Vận chuyển nhanh"} style={{ padding: '4px 30px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '6px' }}>
                        <div className="fast-shipping">
                          <p>Vận chuyển nhanh</p>
                          <p>từ 1-3 ngày</p>
                        </div>
                      </Radio>
                      <Radio value={"Vận chuyển thường"} style={{ padding: '4px 30px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '6px' }}>
                        <div className="nomal-shipping">
                          <p>Vận chuyển thường</p>
                          <p>từ 2-5 ngày</p>
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Địa chỉ nhận"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ nhận hàng',
                      },
                    ]}
                  >
                    <Space.Compact>
                      <Input style={{ width: '355px', marginLeft: '10px' }} />
                    </Space.Compact>
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button onClick={prev}>Previous</Button>
                      <Button type="primary" htmlType="submit">
                        Next
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            )
          }
        </div>

        <div style={contentStyle}>
          {
            (steps[current].content) === 'payment' && (
              <div className="pay">
                <Form
                  form={form}
                  name="wrap"
                  onFinish={handleFinish}
                  labelCol={{
                    flex: '110px',
                  }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={formData.payment}
                >
                  <Form.Item
                    label="Thanh toán"
                    name="paymentMethod"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn phương thức thanh toán',
                      },
                    ]}
                  >
                    <Radio.Group style={{ display: 'flex', flexDirection: 'column' }}>
                      <Radio value={"Thanh toán khi nhận hàng"} style={{ padding: '10px 30px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '6px', width: "60%" }}>
                        <div className="cash-on-delivery">
                          <p style={{ margin: 0 }}>Thanh toán khi nhận hàng</p>
                        </div>
                      </Radio>
                      <Radio value={"Thẻ tín dụng"} style={{ padding: '10px 30px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '6px', width: "60%" }}>
                        <div className="credit-card">
                          <p style={{ margin: 0 }}>Thẻ tín dụng</p>
                        </div>
                      </Radio>

                      <Radio value={"Momo"} style={{ padding: '10px 30px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '6px', width: "60%" }}>
                        <div className="momo-payment">
                          <p style={{ margin: 0 }}>Thanh toán MOMO</p>
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button onClick={prev}>Previous</Button>
                      <Button type="primary" htmlType="submit">
                        Done
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            )
          }
        </div>
      </>
    </div>
  );
}

export default InforCheckout;
