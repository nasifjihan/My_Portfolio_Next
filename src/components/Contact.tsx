"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { z } from "zod";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";

const contactSchema = z.object({
  fullname: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().min(6, "Please enter a valid phone number."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().trim().min(2, "Please enter a subject."),
  message: z.string().trim().min(10, "Please write at least 10 characters."),
});

type ContactFields = z.infer<typeof contactSchema>;
type FieldName = keyof ContactFields;
type FormStatus = {
  state: "idle" | "sending" | "success" | "error";
  message: string;
};

const FIELDS: { name: FieldName; label: string; type: string; autoComplete: string }[] = [
  { name: "fullname", label: "YOUR NAME", type: "text", autoComplete: "name" },
  { name: "phone", label: "PHONE NUMBER", type: "tel", autoComplete: "tel" },
  { name: "email", label: "EMAIL", type: "email", autoComplete: "email" },
  { name: "subject", label: "SUBJECT", type: "text", autoComplete: "off" },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<FormStatus>({
    state: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget)) as Record<FieldName, string>;

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus({ state: "idle", message: "" });
      return;
    }

    setErrors({});
    setStatus({ state: "sending", message: "Sending your message…" });

    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: parsed.data.fullname,
          phone: parsed.data.phone,
          email: parsed.data.email,
          subject: parsed.data.subject,
          message: parsed.data.message,
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus({
        state: "success",
        message: "Message sent successfully. I will get back to you soon.",
      });
      formRef.current?.reset();
    } catch {
      setStatus({
        state: "error",
        message: `Something went wrong. Please email me at ${site.email} instead.`,
      });
    }
  }

  return (
    <section className="Contact" id="contact">
      <div className="top container">
        <SectionHeading eyebrow="CONTACT" title="Contact With Me" centered />

        <div className="content d_flex">
          <div className="left">
            <div className="box box_shadow">
              <div className="img">
                <Image
                  src="/image/contact1.png"
                  alt=""
                  width={460}
                  height={288}
                  className="h-auto w-full"
                />
              </div>

              <div className="details">
                <h1>{site.name}</h1>
                <p>{site.role}</p>
                <p>
                  I am available for freelance work. Connect with me via and call in to my account.
                </p>
                <p className="mt-3">
                  Phone: <a href={`tel:${site.phone}`}>{site.phone}</a>
                </p>
                <p>
                  Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </div>
            </div>
          </div>

          <div className="right box_shadow">
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="f_flex gap">
                {FIELDS.slice(0, 2).map((field) => (
                  <div className="input row field" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    />
                    {errors[field.name] && (
                      <p className="field-error" id={`${field.name}-error`}>
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {FIELDS.slice(2).map((field) => (
                <div className="input field" key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  />
                  {errors[field.name] && (
                    <p className="field-error" id={`${field.name}-error`}>
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div className="input field">
                <label htmlFor="message">YOUR MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  rows={10}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p className="field-error" id="message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn_shadow">
                SEND MESSAGE <FaArrowRight aria-hidden />
              </button>

              <p className="form-status" data-state={status.state} role="status" aria-live="polite">
                {status.message}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
