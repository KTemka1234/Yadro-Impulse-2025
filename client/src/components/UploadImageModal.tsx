import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TextInput,
  Label,
  Spinner,
} from "flowbite-react";
import { X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import imageToAscii from "../converters/imageToAsciiConverter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "../config";

interface UploadImageModalProps {
  show: boolean;
  onClose: () => void;
}

interface IFormInput {
  imageName: string;
  description: string;
}

export default function UploadImageModal({
  show,
  onClose,
}: UploadImageModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isConverting, setIsConverting] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: uploadImage, isPending: isUploading } = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: async (data: { asciiArt: string; description: string }) => {
      const res = await fetch(BACKEND_URL + "/v1/pet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ascii: data.asciiArt,
          description: data.description,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      return { success: true, status: res.status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error: Error) => {
      alert("Что-то пошло не так!\nТекст ошибки: " + error.message);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      imageName: "",
      description: "",
    },
  });

  // Обработка drag-and-drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/svg+xml": [".svg"],
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setValue("imageName", file.name);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (uploadedFile === undefined) {
      setError("imageName", {
        type: "custom",
        message: "Загрузите изображение",
      });
      return;
    }
    setIsConverting(true);
    const asciiArt = await imageToAscii(uploadedFile);
    setIsConverting(false);
    console.log(asciiArt);
    uploadImage({ asciiArt, description: data.description });
    handleClose();
  };

  const handleClose = () => {
    setUploadedFile(undefined);
    reset();
    setIsConverting(false);
    onClose();
  };

  if (!show) return null;

  return (
    <Modal show={show} onClose={onClose} size="md">
      <ModalHeader>Загрузка фото</ModalHeader>
      <ModalBody>
        <form
          id="upload_image"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-2.5"
        >
          {/* Область загрузки */}
          <div
            {...getRootProps()}
            className={`border-primary-400 flex w-full cursor-pointer flex-col items-center gap-2.5 rounded-lg border-2 border-dashed py-2.5 text-center dark:text-white ${isDragActive ? "bg-primary-300 dark:bg-primary-800" : "bg-primary-200 dark:bg-primary-900"}`}
            hidden={uploadedFile !== undefined}
          >
            <input {...getInputProps()} />
            <img src="/dropzone.svg" alt="Dropzone image" width={140} />
            <p className="dark:text-white">
              {isDragActive
                ? "Отпустите для загрузки"
                : "Перетащите файл или кликните для выбора"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Поддерживаемые форматы: JPEG, PNG, SVG
            </p>
          </div>
          <p className="text-sm text-red-500">{errors.imageName?.message}</p>

          {/* Загруженный файл */}
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="image" className="text-sm dark:text-white">
              Загружено
            </Label>
            <div className="relative">
              <TextInput
                id="image"
                color={uploadedFile ? "success" : "gray"}
                disabled
                value={uploadedFile?.name}
                required
                className="w-full cursor-default"
                {...register("imageName", { required: "Загрузите фото" })}
              />
              {uploadedFile && (
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFile(undefined);
                    reset({ imageName: "" });
                  }}
                  className="absolute top-0 right-0 m-2.5 h-5 w-5 rounded-full bg-gray-200 text-red-500 hover:bg-gray-300 hover:text-red-700 dark:bg-gray-600 hover:dark:bg-gray-700"
                >
                  <X className="h-4 w-full" />
                </button>
              )}
            </div>
          </div>

          {/* Описание */}
          <Label htmlFor="description" className="text-sm dark:text-white">
            Описание фото
          </Label>
          <TextInput
            id="description"
            placeholder="Введите описание фото..."
            className="w-full"
            {...register("description", {
              required: "Введите описание фото",
              minLength: 1,
              pattern: {
                value: /^[а-яА-ЯёЁa-zA-Z0-9_ ]+$/i, // alpanumeric, underscore and whitespace
                message:
                  "Используйте только буквы, цифры, подчёркивания и пробелы",
              },
            })}
          />
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        </form>
      </ModalBody>
      <ModalFooter className="justify-center">
        <Button
          type="submit"
          form="upload_image"
          disabled={isConverting || isUploading}
        >
          {isConverting ? (
            <>
              <Spinner size="md" />
              Конвертация...
            </>
          ) : isUploading ? (
            <>
              <Spinner size="md" />
              Отправка...
            </>
          ) : (
            "Загрузить"
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
