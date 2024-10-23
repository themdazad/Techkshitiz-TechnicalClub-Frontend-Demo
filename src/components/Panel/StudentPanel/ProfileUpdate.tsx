import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null as any);
  const OnChangeProfileImage = (event) => {
    if (event.target?.files?.length) {
      const file = event.target?.files[0];
      const SudentId = document.querySelector("#student_id");
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/webp" ||
        file.type === "image/gif"
      ) {
        if (file.size >= 300000) {
          Object(SudentId).value = "";
          toast.error("File size below the 300KB");
        } else {
          setFile(file);
        }
      } else {
        Object(SudentId).value = "";
        toast.error("Only Support image format");
      }
    } else {
      toast.warning("Please select a file");
    }
  };
  const submitData = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const userAuthIncrepted = localStorage.getItem("userAuth");
      const userAuth = userAuthIncrepted
        ? JSON.parse(userAuthIncrepted || "")
        : {};
      if (!userAuth?.techk_Shitiz_Id || !file) {
        if (file && !userAuth?.techk_Shitiz_Id) {
          toast.error("Something went wrong");
          return;
        }
        toast.error("Please select a file");
        return;
      }
      formData.append("participant_Avtar", file);
      formData.append("Techk_Shitiz_Id", userAuth.techk_Shitiz_Id);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/profile/update`;
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (res.status === 200) {
        toast.success("Profile Image Updated Successfully");
        window.location.reload();
        return;
      } else {
        toast.error("Failed to upload image");
        return;
      }
    } catch (error) {
      toast.error("Failed to upload image");
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-4">Profile Update</h1>
      <form
        className="flex flex-col space-y-4 w-1/3 mb-5"
        onSubmit={submitData}
      >
        <label className="text-lg font-bold">Upload Profile Image</label>
        <input
          type="file"
          id="student_id"
          placeholder="Upload Profile Image"
          className="border border-gray-400 p-2 "
          onChange={OnChangeProfileImage}
        />
        <span className="flex text-[#ffeb39]">
          <b>Note: </b>Only image accepted <br /> Size should be less then 300KB
        </span>
      </form>

      <div className="flex flex-row space-x-4">
        <button
          type="submit"
          onClick={submitData}
          disabled={isLoading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${ isLoading ? "cursor-not-allowed bg-blue-200 hover:bg-blue-200" : "cursor-pointer"}`}
        >
          {
            isLoading ? "Loading..." : "Update"
          }
        </button>
        <button
          type="reset"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
