import React, { useState } from "react";
import { Login } from "@/api/interface";
import { HOME_URL } from "@/config";
import { getTimeState } from "utils";
import { useAppDispatch } from "hooks";
import { setToken, fetchMenuList } from "store";
import { notification } from "hooks/module/useMessage";
import { Button, Form, Input } from "antd";
import type { FormInstance, FormProps } from "antd/es/form";
import { loginApi } from "../request";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, CloseCircleOutlined, CheckCircleFilled } from "@ant-design/icons";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formRef = React.useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Login.ReqLoginForm) => {
    try {
      setLoading(true);
      // 1.登录
      const { data } = await loginApi({ ...values, password: values.password });
      dispatch(setToken(data.access_token));

      await dispatch(fetchMenuList());

      notification.success({
        message: getTimeState(),
        description: "欢迎登录 管理员",
        icon: <CheckCircleFilled style={{ color: "#73d13d" }} />
      });
      navigate(HOME_URL);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <div className="login-form-content">
      <Form name="login" size="large" autoComplete="off" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input prefix={<UserOutlined />} placeholder="User：admin / user" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password：123456" />
        </Form.Item>
        <Form.Item className="login-form-button">
          <Button shape="round" icon={<CloseCircleOutlined />} onClick={onReset}>
            Reset
          </Button>
          <Button type="primary" shape="round" icon={<UserOutlined />} loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
