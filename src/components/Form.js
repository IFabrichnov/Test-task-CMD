import React from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { updateVal } from '../features/form/slice'
import { FlexboxGrid, Button, Container, Input, Whisper, Tooltip } from 'rsuite'
import * as Yup from 'yup';
import { useDebouncedCallback } from 'use-debounce'
import Dadata from "./Dadata";

// даты для валидации Date
const yesterday = new Date(Date.now()-86400000);
const nextMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
);

const taskSchema = Yup.object().shape({
    fio: Yup.string().required('Поле обязательно').matches(/\p{L}+\s\p{L}+/u, 'Нужно больее 1 слова'),
    how_old: Yup.number().min(0, 'Не должно быть отрицательным').max(150, 'Не выше 150').required('Поле обязательно'),
    mail: Yup.string().email('Это не email').required('Поле обязательно'),
    date: Yup.date().min(yesterday,'Минимальная дата - сегодня').max(nextMonth, 'Не больше месяца вперед').required('Поле обязательно'),
    hours: Yup.string().required('Поле обязательно')
});

const selectFio = (state) => state.form.fio;
const selectHowOld = (state) => state.form.how_old;
const selectEmail = (state) => state.form.mail;
const selectDate = (state) => state.form.date;
const selectHours = (state) => state.form.hours;
const selectAddress = (state) => state.form.address;

const Form = () => {
    const dispatch = useDispatch();
    const fio = useSelector(selectFio);
    const how_old = useSelector(selectHowOld);
    const mail = useSelector(selectEmail);
    const date = useSelector(selectDate);
    const hours = useSelector(selectHours);
    const address = useSelector(selectAddress);
    const navigate = useNavigate();

    const updateValFromStore = useDebouncedCallback((key, val) => {
        console.log({key, val})
        dispatch(updateVal({key, val}))
    }, 250)

    return (
        <Container style={{height: '100vh', display: 'flex'}}>
            <FlexboxGrid align="middle" justify="center" style={{height: '100%'}}>
                <Formik
                    initialValues={{
                        fio: fio,
                        how_old: how_old,
                        mail: mail,
                        date: date,
                        hours: hours,
                        address: address
                    }}
                    validationSchema={taskSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        navigate("/all-data");
                        setSubmitting(false)
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isValid,
                      }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <Whisper
                                    trigger="none"
                                    open={errors.fio && touched.fio}
                                    speaker={<Tooltip>{errors.fio}</Tooltip>}
                                >
                                    <Input
                                        size="lg"
                                        type="text"
                                        name="fio"
                                        placeholder="ФИО"
                                        style={{
                                            borderColor:
                                                errors.fio && touched.fio ? 'red' : 'inherit',
                                            marginBottom: 20,
                                        }}
                                        onChange={(val, event) => {
                                            handleChange(event)
                                            updateValFromStore('fio', val)
                                        }}
                                        onBlur={handleBlur}
                                        value={values.fio}
                                    />
                                </Whisper>
                                <Whisper
                                    trigger="none"
                                    open={errors.how_old && touched.how_old}
                                    speaker={<Tooltip>{errors.how_old}</Tooltip>}
                                >
                                    <Input
                                        size="lg"
                                        type="number"
                                        name="how_old"
                                        placeholder="Возраст"
                                        style={{
                                            borderColor:
                                                errors.how_old && touched.how_old ? 'red' : 'inherit',
                                            marginBottom: 20,
                                        }}
                                        onChange={(val, event) => {
                                            handleChange(event)
                                            updateValFromStore('how_old', val)
                                        }}
                                        onBlur={handleBlur}
                                        value={values.how_old}
                                    />
                                </Whisper>

                                <Whisper
                                    trigger="none"
                                    open={errors.mail && touched.mail}
                                    speaker={<Tooltip>{errors.mail}</Tooltip>}
                                >
                                    <Input
                                        size="lg"
                                        type="email"
                                        name="mail"
                                        placeholder="Email"
                                        style={{
                                            borderColor:
                                                errors.mail && touched.mail ? 'red' : 'inherit',
                                            marginBottom: 20,
                                        }}
                                        onChange={(val, event) => {
                                            handleChange(event)
                                            updateValFromStore('mail', val)
                                        }}
                                        onBlur={handleBlur}
                                        value={values.mail}
                                    />
                                </Whisper>
                                <Whisper
                                    trigger="none"
                                    open={errors.date && touched.date}
                                    speaker={<Tooltip>{errors.date}</Tooltip>}
                                >
                                    <Input
                                        size="lg"
                                        type="date"
                                        name="date"
                                        placeholder="Дата"
                                        style={{
                                            borderColor:
                                                errors.date && touched.date ? 'red' : 'inherit',
                                            marginBottom: 20,
                                        }}
                                        onChange={(val, event) => {
                                            handleChange(event)
                                            updateValFromStore('date', val)
                                        }}
                                        onBlur={handleBlur}
                                        value={values.date}
                                    />
                                </Whisper>

                                <Whisper
                                    trigger="none"
                                    open={errors.hours && touched.hours}
                                    speaker={<Tooltip>{errors.hours}</Tooltip>}
                                >
                                    <Input
                                        size="lg"
                                        type="time"
                                        name="hours"
                                        placeholder="Время"
                                        style={{
                                            borderColor:
                                                errors.hours && touched.hours ? 'red' : 'inherit',
                                            marginBottom: 20,
                                        }}
                                        onChange={(val, event) => {
                                            handleChange(event)
                                            updateValFromStore('hours', val)
                                        }}
                                        onBlur={handleBlur}
                                        value={values.hours}
                                    />
                                </Whisper>

                                <Dadata />

                                <Button type="submit" disabled={!isValid} style={{marginTop: '20px', width: '100%'}}>
                                    Отправить
                                </Button>
                            </form>
                        )
                    }}
                </Formik>
            </FlexboxGrid>
        </Container>
    )
}

export default Form
