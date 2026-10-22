"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { z } from "zod";
import Container from "@/components/ui/Container";
import NeoCard from "@/components/ui/NeoCard";
import { NeoButton } from "@/components/ui/NeoButton";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

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

const FIELDS: {
  name: FieldName;
  label: string;
  type: string;
  autoComplete: string;
  fullWidth?: boolean;
}[] = [
  { name: "fullname", label: "YOUR NAME", type: "text", autoComplete: "name" },
  { name: "phone", label: "PHONE NUMBER", type: "tel", autoComplete: "tel" },
  { name: "email", label: "EMAIL", type: "email", autoComplete: "email", fullWidth: true },
  { name: "subject", label: "SUBJECT", type: "text", autoComplete: "off", fullWidth: true },
];

const controlClass =
  "mt-1.5 mb-[13px] w-full rounded-[7px] border-[3px] border-[#e2e8ec] bg-white p-3 text-ink outline-none transition-colors focus-visible:border-brand";

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  fullWidth?: boolean;
  children: ReactNode;
};

function Field({ name, label, error, fullWidth = false, children }: FieldProps) {
  return (
    <div className={cn("min-w-0", fullWidth && "sm:col-span-2")}>
      <label className="block text-[13px] tracking-[1px]" htmlFor={name}>
        {label}
      </label>
      {children}
      {error && (
        <p className="-mt-1.5 mb-2.5 text-[13px] text-[#c81e4a]" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

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
    <Section id="contact">
      <Container>
        <SectionHeading eyebrow="CONTACT" title="Contact With Me" centered />

        <div className="flex flex-col gap-8 min-[900px]:flex-row min-[900px]:items-stretch min-[900px]:justify-between min-[900px]:gap-10">
          <div className="mt-12.5 flex w-full min-[900px]:mt-0 min-[900px]:w-[38%]">
            <NeoCard className="flex h-full w-full flex-col p-7.5">
              <Image
                src="/image/contact1.png"
                alt=""
                width={460}
                height={288}
                className="h-auto w-full rounded-[10px]"
              />

              <div className="mt-6 flex flex-1 flex-col space-y-2.5">
                <h1 className="my-4 text-[35px] leading-[1.15]">{site.name}</h1>
                <p className="text-base">{site.role}</p>
                <p className="text-base leading-7">I am available for freelance work.</p>
                <p className="mt-3 text-base">
                  Phone:{" "}
                  <a className="transition-colors hover:text-brand" href={`tel:${site.phone}`}>
                    {site.phone}
                  </a>
                </p>
                <p className="text-base">
                  Email:{" "}
                  <a className="transition-colors hover:text-brand" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </p>
              </div>
            </NeoCard>
          </div>

          <NeoCard className="h-full w-full p-6 min-[900px]:w-[58%] min-[900px]:p-[35px]">
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                {FIELDS.map((field) => (
                  <Field
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    error={errors[field.name]}
                    fullWidth={field.fullWidth}
                  >
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                      className={controlClass}
                    />
                  </Field>
                ))}

                <Field name="message" label="YOUR MESSAGE" error={errors.message} fullWidth>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={controlClass}
                  />
                </Field>
              </div>

              <NeoButton type="submit" className="w-full font-semibold tracking-[1px] text-brand">
                SEND MESSAGE <FaArrowRight aria-hidden />
              </NeoButton>

              <p
                className="mt-4 data-[state=error]:text-[#c81e4a] data-[state=success]:text-[#1a7f4b]"
                data-state={status.state}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            </form>
          </NeoCard>
        </div>
      </Container>
    </Section>
  );
}
