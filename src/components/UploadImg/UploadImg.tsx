// @ts-nocheck
import { useState } from "react";
import { httpPost } from "../../utils";
import Preloader from "../Preloader/Preloader";

const UploadImg = (props) => {
  const { todo_id, changeTodolist, tasks, task_id } = props;
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const onUpload = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const format = file.type.split("/")[1];
      const key = file.lastModifiedDate.toString().replace(/ |:|\+/g, "");
      const base64 = await convertBase64(file);
      setIsFetching(true);
      httpPost(`/upload/image`, {
        key: `${key}.${format}`,
        data: base64,
        todo_id: todo_id,
      })
        .then((post) => {
          const updatedTasks = tasks.map((el) => {
            if (el.task_id === task_id) {
              el.img = post.url;
              return el;
            } else {
              return el;
            }
          });
          changeTodolist(todo_id, { tasks: JSON.stringify(updatedTasks) });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsFetching(false));
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return isFetching ? (
    <Preloader />
  ) : (
    <input type="file" name="myImage" onChange={onUpload} />
  );
};

export default UploadImg;
