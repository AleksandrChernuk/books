export const dynamic = "force-dynamic";

import { getContacts } from "@/actions/get.contacts";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import dayjs from "dayjs";

export default async function AdminPage() {
  const contacts = await getContacts();

  const hasContacts = Array.isArray(contacts) && contacts.length > 0;

  return (
    <Container>
      <Wrapper>
        <div>
          <h2>Зворотній зв’язок</h2>
          {!hasContacts ? (
            <p>Повідомлень не знайдено</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {contacts.map((el) => (
                <li
                  className="p-4 shadow-md flex flex-col gap-2 rounded-2xl border border-slate-100"
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
                      <p className="text-gray-700 text-base">{el.message}</p>
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
          )}
        </div>
      </Wrapper>
    </Container>
  );
}
