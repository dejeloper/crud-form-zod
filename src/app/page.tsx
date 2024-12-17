"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  surname: z
    .string({ required_error: "El apellido es requerido" })
    .min(3, "El apellido debe tener al menos 3 caracteres"),
  age: z
    .string({ required_error: "La edad es requerida" })
    .min(1, "La edad debe ser tener al menos 1 digito")
    .max(3, "La edad debe ser tener máximo 3 digitos")
    .transform((value) => parseInt(value)),
  civilStatus: z
    .string({
      required_error: "El estado civil es requerido",
      invalid_type_error: "Seleccione un estado civil válido",
    })
    .refine((value) => civilStatusOptions.includes(value), {
      message: "Seleccione un estado civil válido",
    }),
});

const civilStatusOptions = [
  "Soltero",
  "Casado",
  "Viudo",
  "Divorciado",
  "Separado",
];

type UserType = z.infer<typeof userSchema>;

export default function Page() {
  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: 0,
      civilStatus: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: UserType) => {
    console.log(data);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear un nuevo Usuario</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-y-4 min-w-72" onSubmit={onSubmit}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="name"
                      autoComplete="name"
                    />
                  </FormControl>
                  {form.formState.errors.name && (
                    <FormDescription className="text-red-500">
                      {form.formState.errors?.name.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="surname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="surname">Apellido</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="surname"
                      autoComplete="additional-name"
                    />
                  </FormControl>
                  {form.formState.errors.surname && (
                    <FormDescription className="text-red-500">
                      {form.formState.errors?.surname.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="age"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="age">Edad</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      id="age"
                      autoComplete="age"
                    />
                  </FormControl>
                  {form.formState.errors.age && (
                    <FormDescription className="text-red-500">
                      {form.formState.errors?.age.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="civilStatus"
              control={form.control}
              render={({ field }) => (
                <FormItem id="civilStatusFormItem">
                  <FormLabel htmlFor="civilStatus">Civil Status</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  >
                    <FormControl id="civilStatusFormControl">
                      <SelectTrigger id="civilStatus" name={field.name}>
                        <SelectValue placeholder="Seleccione un estado civil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent id="civilStatusFormContent">
                      {civilStatusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.civilStatus && (
                    <FormDescription className="text-red-500">
                      {form.formState.errors?.civilStatus.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit">Guardar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
