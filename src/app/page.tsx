import React from "react";
import Task from "../app/components/Task";
// import Toast from "../app/components/Toast";
import NavBar from "../app/components/NavBar";
// import Prompt from "../app/components/Prompt";
// import Modal from "../app/components/Modal";

const page = () => {
  return (
    <>
    <NavBar/>
      <Task />
      {/* <Prompt/> */}
      {/* <Modal/> */}
      {/* <Toast /> */}
    </>
  );
};

export default page;
