import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { Moment } from "moment";
import React, { useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import { rules } from "../utils/rules";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

export const EventForm: React.FC<EventFormProps> = (props) => {
  const { Option } = Select;
  const { user } = useTypedSelector(({ auth }) => auth);

  const [event, setEvent] = useState<IEvent>({
    author: "",
    guest: "",
    date: "",
    describtion: "",
  });

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date?.toDate()) });
    }
  };

  const submitForm = () => {
    props.submit({ ...event, author: user.username });
  };
  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Название события"
        name="description"
        rules={[rules.required("Введите название события!")]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, describtion: e.target.value })}
          value={event.describtion}
        />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[rules.required("Выберите дату!")]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map((guest) => (
            <Option key={guest.username} value={guest.username}>
              {guest.username}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};
