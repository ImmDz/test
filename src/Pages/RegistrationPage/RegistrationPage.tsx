import { FC, useEffect } from "react";
import { Form, Input, Radio, Checkbox, Switch, DatePicker, Button, Typography, Layout, message } from "antd";
import { getCategories, categoryActions, userActions, getIsAuthValue } from "src/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { Navigate, Link } from "react-router-dom";
import { Formik } from "formik";
import css from "./registration.module.css";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().min(2, 'Поле должно содержать минимум 2 символа').required("Обязательное поле"),
    surname: yup.string().min(2, 'Поле должно содержать минимум 2 символа').required("Обязательное поле"),
    login: yup.string().email('Введите корректный email').required("Обязательное поле"),
    password: yup.string().min(6, "Поле должно содержать минимум 6 символов").required("Обязательное поле"),
    repeatedPassword: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают"),
    interests: yup.array().min(2, "Должно быть выбрано минимум 2 категории").required("Обязательное поле"),
    isSubscribe: yup.boolean().required("Обязательное поле"),
    bornAt: yup.date().min('1930-01-01', 'Дата не должна быть раньше 1 января 1930 года').nullable("Обязательное поле").required("Обязательное поле"),
    secret: yup.object().shape({
        type: yup.string(),
        answer: yup.string().test('answer', 'Ответ обязателен', function (value) {
            const type = this.parent.type;
            return type ? !!value : true;
        })
    })
});

export const RegistrationPage: FC = () => {
    const categories = useSelector(getCategories);
    const dispatch = useAppDispatch();
    const isAuth = useSelector(getIsAuthValue);

    useEffect(() => {
        dispatch(categoryActions.serverRequest());
    }, [])


    return (
        <Layout.Content className="content">
            <h2 className="categoryTitle">Регистрация</h2>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    login: '',
                    password: '',
                    repeatedPassword: '',
                    bornAt: '',
                    secret: {
                        type: '',
                        answer: '',
                    },
                    gender: '',
                    interests: [] as string[],
                    isSubscribe: false,
                }}
                validateOnBlur
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(userActions.registration(values))
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, setFieldValue }) => (
                    <Form
                        className={css.registrationForm}
                        onFinish={handleSubmit}
                        layout="horizontal">
                        <Form.Item label="Имя" required>
                            <Input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                            {touched.name && errors.name && <Typography.Text className={css.errorMessage}>{errors.name}</Typography.Text>}
                        </Form.Item>
                        <Form.Item label="Фамилия">
                            <Input name="surname" value={values.surname} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Логин" required>
                            <Input name="login" placeholder="Введите почту" value={values.login} onChange={handleChange} onBlur={handleBlur} />
                            {touched.login && errors.login && <Typography.Text className={css.errorMessage}>{errors.login}</Typography.Text>}
                        </Form.Item>
                        <Form.Item label="Пароль" required>
                            <Input.Password name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            {touched.password && errors.password && <Typography.Text className={css.errorMessage}>{errors.password}</Typography.Text>}
                            <Input.Password name="repeatedPassword" value={values.repeatedPassword} onChange={handleChange} onBlur={handleBlur} />
                            {touched.repeatedPassword && errors.repeatedPassword && <Typography.Text className={css.errorMessage}>{errors.repeatedPassword}</Typography.Text>}
                        </Form.Item>
                        <Form.Item label="Пол">
                            <Radio.Group name="gender" defaultValue={values.gender} onChange={handleChange}>
                                <Radio value="male">Мужской</Radio>
                                <Radio value="female">Женский</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Любимые категории" required>
                            {categories.map((category) => <Checkbox onClick={handleBlur}
                                name="interests" key={category.id}
                                checked={values.interests.includes(category.label)}
                                onChange={(e) => {
                                    const { interests } = values;
                                    let newInterests;
                                    e.target.checked ? newInterests = [...interests, category.label] : newInterests = interests.filter((interest) => interest !== category.label)
                                    setFieldValue("interests", newInterests);
                                }}>{category.label}</Checkbox>)}
                            {touched.interests && errors.interests && <Form.Item><Typography.Text className={css.errorMessage}>{errors.interests}</Typography.Text></Form.Item>}
                        </Form.Item>
                        <Form.Item label="Подписаться на новости" >
                            <Switch defaultChecked={values.isSubscribe} onChange={(value) => setFieldValue("isSubscribe", value)} />
                        </Form.Item>
                        <Form.Item label="Дата рождения" required>
                            <DatePicker name="date" onChange={(date) => setFieldValue("bornAt", date?.format("YYYY-MM-DD") ?? '')} />
                            {touched.bornAt && errors.bornAt && <Form.Item><Typography.Text className={css.errorMessage}>{errors.bornAt}</Typography.Text></Form.Item>}
                        </Form.Item>
                        <Form.Item label="Секр. вопрос для восст. пароля">
                            <Input name="type" placeholder="Вопрос" value={values.secret.type} onChange={(e) => setFieldValue("secret.type", e.target.value)} onBlur={handleBlur} />
                            {touched.secret?.type && errors.secret?.type && <Typography.Text className={css.errorMessage}>{errors.secret?.type}</Typography.Text>}
                            <Input name="answer" placeholder="Ответ" value={values.secret.answer} onChange={(e) => setFieldValue("secret.answer", e.target.value)} onBlur={handleBlur} />
                            {touched.secret?.answer && errors.secret?.answer && <Typography.Text className={css.errorMessage}>{errors.secret?.answer}</Typography.Text>}
                        </Form.Item>
                        <Form.Item className={css.fromContol}>
                            {isAuth && <Navigate to="/" />}
                            <Button type="primary" htmlType="submit" onClick={() => {
                                if (!isValid) {
                                    message.open({
                                        type: "error",
                                        content: "Заполните все поля"
                                    })
                                }
                                handleBlur;
                                handleSubmit();
                            }}>Зарегистрироваться</Button>
                            <Link to="/"><Button>Отмена</Button></Link>
                        </Form.Item>
                    </Form >
                )}
            </Formik>
        </Layout.Content>
    )
}