import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Member {
  id: number;
  name: string;
  percent: number;
}

const App: React.FC = () => {
  const [admin, setAdmin] = useState(100);

  const [input, setInput] = useState(0);

  const [name, setName] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [members, setMembers] = useState<Member[]>([]);

  const [editMemberId, setEditMemberId] = useState<number | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(+e.target.value);
  };

  const adminPercent =
    100 - members.reduce((a, b) => a + b.percent, 0) ||
    members.reduce((a, b) => a + b.percent, 0) - 100;
  const memberPercent = input > admin ? admin : input;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMembers([
      ...members,
      { id: members.length, name: name, percent: memberPercent },
    ]);
    setInput(0);
    setName("");
    if (members.reduce((a, b) => a + b.percent, 0) === 100) {
      alert("Members Already Full!!!");
      setMembers(members);
    }
  };

  useEffect(() => {
    if (adminPercent > 0) {
      setAdmin(adminPercent);
    } else {
      setAdmin(0);
    }
  }, [adminPercent]);

  const [newInput, setNewInput] = useState(memberPercent);

  const handleDisplay = (id: number) => {
    setIsEdit(true);
    setEditMemberId(id);
    const memberToEdit = members.find((m) => m.id === id);

    if (memberToEdit) {
      setNewInput(memberToEdit.percent);
    } else {
      alert("error");
    }
  };

  // const possibleUpdate = members.map((m) => {
  //   if (m.id === editMemberId && memberAddAll <= 100) {
  //     return { ...m, percent: newInput };
  //   }
  //   return m;
  // });
  // console.log(possibleUpdate);

  // if (memberAddAll <= 100) {
  //   setMembers(possibleUpdate);
  // }

  const updatePercent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsEdit(false);

    const updateMember = members.map((m) => {
      if (m.id === editMemberId) {
        const newPercent =
          newInput - m.percent < adminPercent
            ? newInput
            : adminPercent + m.percent;
        return { ...m, percent: newPercent };
      }
      return m;
    });

    setMembers(updateMember);

    setEditMemberId(null);
  };

  const deleteMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };
  return (
    <div className="p-6">
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-2">
          <div
            className="flex items-center gap-5 bg-red-600 text-white py-1 px-2 rounded-lg font-medium
          sm:gap-40 md:gap-60 lg:gap-80 xl:gap-96 "
          >
            <p>Admin</p>
            <p>{admin}%</p>
          </div>

          {members &&
            members.map((m, i) => {
              return (
                <div
                  className=" flex items-center justify-between gap-5 bg-blue-600 text-white py-1 px-2 rounded-lg font-medium"
                  key={i}
                >
                  <p>{m.name}</p>

                  <div className="flex items-center justify-center gap-1">
                    <p onClick={() => handleDisplay(m.id)}>{m.percent}%</p>
                    <FaTrash
                      className=" hover:text-red-500"
                      onClick={() => deleteMember(m.id)}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex gap-4">
          {isEdit && (
            <form className="flex flex-col gap-2" onSubmit={updatePercent}>
              <p className="text-xl font-semibold">
                Update member percent here
              </p>
              <div className="flex flex-col gap-2">
                <input
                  autoFocus
                  min={0}
                  max={100}
                  onChange={(e) => setNewInput(+e.target.value)}
                  value={newInput}
                  type="number"
                  className=" border border-green-500 text-black w-1/2 rounded-md"
                />
                <button className="bg-blue-500 rounded-lg py-1  text-white w-1/2 hover:bg-blue-600">
                  Update
                </button>
              </div>
            </form>
          )}
          <form
            className="flex flex-col justify-between gap-4"
            onSubmit={handleSubmit}
          >
            <p className="text-xl font-semibold">Add New Member Here</p>
            <div>
              <p>Member Name</p>
              <input
                className=" border-2 border-blue-500 rounded-md w-1/2"
                required
                value={name}
                placeholder="e.g. John"
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>

            <div>
              <p>Percent for Member</p>
              <input
                className="border-2 border-blue-500 rounded-md w-1/2"
                min={0}
                max={100}
                value={input}
                type="number"
                onChange={handleInput}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white w-1/2 rounded-lg py-1 hover:bg-blue-600"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
