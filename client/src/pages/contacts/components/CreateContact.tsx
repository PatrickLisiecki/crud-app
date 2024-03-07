import { useState } from "react";
import { Button } from "@/components/ui/button";

import * as yup from "yup";

// RTQ Query
import { useAddContactMutation } from "@/redux/services/contacts";

interface CreateContactProps {
  isCreating: boolean;
  toggleIsCreating: () => void;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = yup.object().shape(
  {
    name: yup.string().required("A name is required."),
    email: yup.string().email("Please enter a valid email."),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid."),
    // phoneNumber: yup.string().when("phoneNumber", (val) => {
    //   if (val.length > 0) {
    //     return yup.string().matches(phoneRegExp, "Phone number is not valid.");
    //   } else {
    //     return yup.string().notRequired();
    //   }
    // }),
  },
  // [["phoneNumber", "phoneNumber"]],
);

export const CreateContact = ({
  isCreating,
  toggleIsCreating,
}: CreateContactProps) => {
  // const { contacts, setContacts } = useContext(ContactContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [addContact, result] = useAddContactMutation();

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      phoneNumber: phone,
    };

    const contact = await formSchema.validate(data).catch((err) => {
      const { errors } = err;
      setError(errors);
    });

    if (contact) {
      await addContact(data);
      toggleIsCreating();
      setName("");
      setEmail("");
      setPhone("");
      setError("");
    }
  };

  return (
    <div
      className={`${isCreating ? "block" : "hidden"} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50`}
    >
      <div className="mx-4 w-full rounded-lg bg-white p-8 md:max-w-md">
        <h2 className="text-xl font-semibold">Create a Contact</h2>

        <div
          className={`${error ? "block" : "hidden"} my-2 w-full rounded-lg bg-red-500 p-2 text-sm text-white`}
        >
          {error}
        </div>

        <form
          onSubmit={handleCreateContact}
          className="mt-4 flex flex-col items-center gap-y-2"
        >
          {/* Name Input */}
          <div className="relative flex min-h-[40px] w-full flex-col justify-center">
            <input
              type="text"
              value={name}
              placeholder="John Smith"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
            />
          </div>
          {/* Email Input */}
          <div className="relative flex min-h-[40px] w-full flex-col justify-center">
            <input
              type="text"
              value={email}
              placeholder="example@gmail.com"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
            />
          </div>
          {/* Phone Number Input */}
          <div className="relative flex min-h-[40px] w-full flex-col justify-center">
            <input
              type="text"
              value={phone}
              placeholder="777-777-7777"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="text-dark placeholder:text-place dark:bg-dark block w-full cursor-text rounded border border-gray-500 p-4 focus:outline-none dark:text-white"
            />
          </div>
          <div className="mt-4 flex w-full flex-row justify-evenly">
            <Button
              type="button"
              size="lg"
              variant="destructive"
              onClick={() => toggleIsCreating()}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" variant="confirm">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
