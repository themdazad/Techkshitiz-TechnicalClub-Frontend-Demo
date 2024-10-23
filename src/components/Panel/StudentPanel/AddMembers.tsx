import React, { useState, useEffect } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";

function AddMembers() {
  const [members, setMembers] = useState<string[]>([""]);
  const [membersData, setMembersData] = useState<{ members: string[] }>({ members: [""] });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addMember = () => {
    if (members.length < 4) {
      const newMembers = [...members, ""];
      setMembers(newMembers);
      setMembersData({ members: newMembers });
    }
  };

  const removeMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
    setMembersData({ members: newMembers });
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
    setMembersData({ members: newMembers });
  };

  const toggleEdit = (index: number) => {
    setEditIndex(editIndex === index ? null : index);
  };

  useEffect(() => {
    setMembersData({ members });
  }, [members]);

  return (
    <section className="w-full min-h-full space-y-6">
      <div className="heading flex flex-col items-center space-y-1 font-bold">
        <h1 className="text-3xl">Add Team Members</h1>
        <hr
          className="h-[2px] w-[300px] mg:w-[350px] border-none rounded-[10px] bg-gradient-to-r from-transparent via-sky-600 to-transparent"
          style={{
            borderImage:
              "linear-gradient(to right, transparent, sky-600, transparent)",
            borderImageSlice: 1,
          }}
        />
      </div>

      {/* Input field for members */}
      <div className="members text-md grid grid-cols-1 justify-items-center">
        {members.map((member, index) => (
          <div className="member flex" key={index}>
            <input
              className="rounded-xl w-full p-2 px-4 my-1 bg-gray-800"
              type="text"
              name={`member${index + 1}`}
              id={`member${index + 1}`}
              placeholder={`Member ${index + 1} Techkshitiz ID`}
              value={member}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              disabled={editIndex !== index}
            />
            <button
              type="button"
              onClick={() => removeMember(index)}
              className="ml-2 p-3 self-center aspect-square bg-red-500 text-white rounded"
            >
              <MdDeleteOutline />
            </button>
            <button
              type="button"
              onClick={() => toggleEdit(index)}
              className={`ml-2  p-3 self-center aspect-square ${(editIndex === index) ? "bg-green-500" : "bg-zinc-600"}  text-white rounded`}
            >
              {(editIndex === index) ? <MdDone /> :  <MdEdit />}
            </button>
          </div>
        ))}
        {members.length < 4 && (
          <button
            type="button"
            onClick={addMember}
            className="mt-6 p-2 rounded-xl px-4 bg-blue-500 text-white"
          >
            Add Member
          </button>
        )}
      </div>

      {/*Just Testing to show data coming in JSON format  */}

      {/* <h1>Members JSON Data :</h1>
      
      <pre>{JSON.stringify(membersData, null, 2)}</pre> */}

    </section>
  );
}

export default AddMembers;