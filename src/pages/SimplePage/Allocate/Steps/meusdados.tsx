import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import Navbar from '../../../components/Navbar/Navbar';

import { Link, useNavigate } from 'react-router-dom';

export function ChooseDateStep() {
  const [selectedRange, setSelectedRange] = useState(null);
  const [scheduledEvent, setScheduledEvent] = useState(null);
  const navigate = useNavigate();

  const [calendarHeight, setCalendarHeight] = useState('70vh');

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
  };

  const handleScheduleEvent = () => {
    if (selectedRange) {
      const eventName = window.prompt('Nome do evento:');
      if (eventName) {
        setScheduledEvent({
          start: selectInfo.start.toLocaleString('pt-BR'), // Formatar a data de início
          end: selectInfo.end.toLocaleString('pt-BR'), // Formatar a data de fim
          name: eventName
        });
      }
    }
  };

  return (
    
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="p-6 bg-white shadow-md rounded-lg mb-3 w-full max-w-screen-lg">
        <h2 className="text-center mb-4">Agendamento</h2>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable={true}
          select={handleSelect}
          locale={ptBrLocale}
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
            <p><center>Início: {selectedRange.start.toLocaleString('pt-BR')}</center></p>
            <p><center>Fim: {selectedRange.end.toLocaleString('pt-BR')}</center></p>
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
