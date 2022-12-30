import * as yup from "yup";

export const reminderSchema = yup.object({
  title: yup.string().required().max(15),
  description: yup.string().required().min(5),
  priority: yup.string().required(),
  remindOn: yup.date().required(),
});
