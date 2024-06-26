import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
//import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import es from '@fullcalendar/core/locales/es-us';
import { formatDate } from '@fullcalendar/core'
import moment from 'moment';

import Navbar from '../../../components/Navbar/Navbar';
import { FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../hooks/Auth';

import { Link, useNavigate } from 'react-router-dom';

export function ChooseDateStep() {
  const [selectedRange, setSelectedRange] = useState(null);
  const [scheduledEvent, setScheduledEvent] = useState(null);
  const navigate = useNavigate();
  const [varStart, setVarStart] = useState(null);
  const [varEnd, setVarEnd] = useState(null);

  const [calendarHeight, setCalendarHeight] = useState('70vh');

  const [successMessage, setSuccessMessage] = useState('');




  useEffect(() => {
    function updateCalendarHeight() {
      const height = window.innerHeight * 0.7;
      setCalendarHeight(height);
    }

    updateCalendarHeight();

    window.addEventListener('resize', updateCalendarHeight);
    

    return () => {
      
      window.removeEventListener('resize', updateCalendarHeight);
    };
  }, []);

  const handleSelect = (selectInfo) => {

    setSelectedRange(selectInfo);
    console.log('Intervalo de tempo selecionado:', selectInfo.start, selectInfo.end);

    console.log(selectInfo.end.toString());
    //convertendo para o formato que o Back espera
    const formato = "YYYY-MM-DDTHH:mm:ss";
    let str = formatDate(selectInfo.start, {
      month: 'numeric',
      year: 'numeric',
      day: 'numeric',
      timeZoneName: 'short',
      timeZone: 'UTC'
      //locale: 'es'
    })
    //"startDate": "2007-12-03T10:15:30",
    console.log(str) // "1 de septiembre de 2018 0:00 UTC"
    console.log(varStart);
    const dataConvertidaStart = moment(selectInfo.start, "MM/DD/YYYY, hh:mm A").format(formato);
    const dataConvertidaEnd = moment(selectInfo.end, "MM/DD/YYYY, hh:mm A").format(formato);
    console.log(dataConvertidaStart); // Saída: 2024-05-17T12:00:00
    setVarStart(dataConvertidaStart);
    setVarEnd(dataConvertidaEnd);
  };

  
  const handleScheduleEvent = async () => {
    if (selectedRange) {
      const eventName = window.prompt('Nome do evento:');
      if (eventName) {
        try {
          console.log();
        const response = await axios.post('http://localhost:8080/reservas', {         
        startDate: varStart, // Formatar a data de início
        endDate: varEnd, // Formatar a data de fim
        nome: eventName,
        locatarioId: idUsuario})
  
        console.log("cheguei no back");
        setSuccessMessage('Reserva Realizada com sucesso!');
        window.alert('Reserva Realizada com sucesso! Entrada: '+ varStart + 'Saida: '+ varEnd); 
        } catch (error) {
          console.log('Error creating company:', error);
        };
      }
    }
  }



  const authentication = useAuth();
  const idUsuario = authentication.user?.id;


  return (
    
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="p-6 bg-white shadow-md rounded-lg mb-3 w-full max-w-screen-lg">
        <h2 className="text-center mb-4">Agendamento</h2>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable={true}
          select={handleSelect}
          locale={es}
          allDaySlot={false}
          height={calendarHeight}          
          themeSystem="standard"
          headerToolbar={{
            start: 'title',
            center: 'prev,next today',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          eventColor="#0078d4" // Cor dos eventos
          eventTextColor="#ffffff" // Cor do texto dos eventos
          dayMaxEventRows={true} // Exibir várias linhas de eventos no mesmo dia
          slotMinTime="06:00:00" // Horário mínimo no grid de tempo
          slotMaxTime="22:00:00" // Horário máximo no grid de tempo
          dayHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric' }} // Formato do cabeçalho do dia
          dayHeaderContent={(arg) => (
            <div className="fc-daygrid-day-number" style={{ fontSize: '10px' }}>{arg.text}</div>
          )}
          slotLabelFormat={null} // Remover o campo 5 – 11 de mai. de 2024 no topo do calendário
          // Estilos que se assemelham ao Material Design
          themeClassNames={{
            headerToolbar: 'fc-toolbar-material',
            table: 'fc-table-material',
            buttonGroup: 'fc-button-group-material',
            button: 'fc-button-material',
            buttonIcon: 'fc-button-icon-material',
            buttonText: 'fc-button-text-material',
            today: 'fc-today-material',
            past: 'fc-past-material',
            future: 'fc-future-material',
            event: 'fc-event-material',
            interaction: 'fc-interaction-material',
            date: 'fc-date-material',
            title: 'fc-title-material',
            popover: 'fc-popover-material',
            dayGridMonthView: 'fc-dayGridMonth-view-material',
            dayGridDayView: 'fc-dayGridDay-view-material',
            timeGridWeekView: 'fc-timeGridWeek-view-material',
            timeGridDayView: 'fc-timeGridDay-view-material'
          }}
        />
        {selectedRange && (
          
          <div>
            <p><center>Início: {selectedRange.start.toLocaleString('es')}</center></p>
            <p><center>Fim: {selectedRange.end.toLocaleString('es')}</center></p>
            <div className="text-center">
              <button onClick={handleScheduleEvent} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Reservar</button>
            </div>
          </div>
        )}

        {scheduledEvent && (
          <p>Evento agendado de {scheduledEvent.start} a {scheduledEvent.end}: {scheduledEvent.name}</p>
        )}
        <div className="mt-4 flex justify-between">
          <Link to="/" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Voltar</Link>
          <button onClick={() => navigate('/empresa/1')} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Próximo</button>
        </div>
      </div>
    </div>
  );
}
