import { Button, Layout, Row, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { EventCalendar } from "../components/EventCalendar";
import { EventForm } from "../components/EventForm";
import { useAction } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

export const Event: React.FC = () => {
  const { fecthGuests, createEvent, fetchEvents } = useAction();
  const { guests, events } = useTypedSelector(({ event }) => event);
  const { user } = useTypedSelector(({ auth }) => auth);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fecthGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false);
    createEvent(event);
  };

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={(e) => setModalVisible(true)}>добавить событие</Button>
      </Row>
      <Modal
        title="Basic Modal"
        visible={modalVisible}
        footer={null}
        onCancel={(e) => setModalVisible(false)}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};
