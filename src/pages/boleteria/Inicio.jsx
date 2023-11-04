import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { BoletaCreate } from "./BoletaCreate";
import { Loader } from "../../components/Loader";


export const Inicio = () => {

  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUsers(userId);
    }
    setIsLoading(false);
  }, []);

  
  return (
    <>
      <div className="App">
        {isLoading ? (
          <Loader />
        ) : users ? (
          <BoletaCreate />
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};
