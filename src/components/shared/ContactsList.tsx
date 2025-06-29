import { getContacts } from "@/actions/get.contacts";
import dayjs from "dayjs";

export default async function ContactsList() {
  const contacts = await getContacts();

  if (!contacts) {
    return null;
  }

  return (
    <ul>
      {contacts.map((el) => (
        <li
          className="p-4 shadow-md flex flex-col gap-2 rounded-2xl"
          key={el.id}
        >
          <ul className="flex flex-col">
            <li>
              <h5 className="text-gray-800">{el.name}</h5>
            </li>
            <li>
              <h6 className="text-gray-600">{el.email}</h6>
            </li>
            <li>
              <p className="text-gray-600">{el.message}</p>
            </li>
            <li>
              <p className="text-xs text-gray-400">
                {el.createdAt
                  ? dayjs(el.createdAt).format("DD.MM.YYYY HH:mm")
                  : ""}
              </p>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
}
