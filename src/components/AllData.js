import React from 'react';
import { Container, Content } from 'rsuite';
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AllData() {
    const { fio, how_old, mail, date, address, hours } = useSelector((state) => state.form);
    const navigate = useNavigate();

    const allStyles = {padding: '5px', border: '1px solid', textAlign: 'center'};

    return (
        <Container style={{display: 'flex', alignItems: 'center', marginTop: '100px'}}>
            <Content style={{display: 'flex', flexDirection: 'column'}}>
                <div style={allStyles}>ФИО: {fio}</div>
                <div style={allStyles}>Возраст: {how_old}</div>
                <div style={allStyles}>Email: {mail}</div>
                <div style={allStyles}>Дата: {date}</div>
                <div style={allStyles}>Время: {hours}</div>
                <div style={allStyles}>Адрес: {address.value}</div>

                <button style={{padding: '5px', marginTop: '10px'}} type="submit" onClick={() => navigate(-1)}>Назад</button>
            </Content>
        </Container>
    )
}
