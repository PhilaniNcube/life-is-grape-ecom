import {
  Button,
  Container,
  Html,
  Section,
  Tailwind,
  Text,
  Link,
} from '@react-email/components'
import * as React from 'react'


interface ContactForm {
  name: string
  email: string
  subject: string
  tel: string
  message: string
}

const ContactFormTemplate = ({name, email, subject, tel, message}:ContactForm) => {
  return <Tailwind>
    <Container className='bg-slate-100 py-5 my-5'>
      <Text className='text-center text-2xl font-extrabold'>
        Contact Form
      </Text>
      <Text className='text-center text-lg'>
        You have received a new contact form submission
      </Text>
      <Section className='mt-5 bg-white p-5'>
        <Text className='text-xl font-bold'>Contact Form Details</Text>
        <Text>
          <strong>Name:</strong> {name}
        </Text>
        <Text>
          <strong>Email:</strong> {email}
        </Text>
        <Text>
          <strong>Subject:</strong> {subject}
        </Text>
        <Text>
          <strong>Phone:</strong> {tel}
        </Text>
        <Text>
          <strong>Message:</strong> {message}
        </Text>
      </Section>
    </Container>
  </Tailwind>;
};
export default ContactFormTemplate;
