import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm, usePage, router } from "@inertiajs/react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

import Creatable, { useCreatable } from "react-select/creatable";

import "../../../../css/form.css";

export default function CreateFloockForm({ options, user, onClose }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        project: null,
        user_id: user.id,
        tag: null,
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.name === "") {
            toast.error("Please name your Floock");
            return;
        }
        if (data.project === null) {
            toast.error("Please select a project");
            return;
        }

        post(route("floocks.create", data));
    };

    if (recentlySuccessful && !processing) {
        onClose(false);
    }

    return (
        <>
            <h2>Start a New Floock</h2>
            <form
                onSubmit={handleSubmit}
                method="post"
                className="flex flex-row gap-4  justify-center"
            >
                <div className="flex flex-col">
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="What are you doing?"
                        autoComplete="off"
                    />
                </div>

                <div className="flex flex-col">
                    <Creatable
                        options={options.projects}
                        onChange={(e) => setData("project", e)}
                        defaultValue={data.project}
                        placeholder={"Project"}
                        className={"creatable"}
                        classNamePrefix="creatable"
                    />
                </div>

                <div className="flex flex-col">
                    <Creatable
                        options={options.tags}
                        onChange={(e) => setData("tag", e)}
                        defaultValue={data.tag}
                        placeholder={"Tag"}
                        className={"creatable"}
                        classNamePrefix="creatable"
                    />
                </div>
                <button type="submit" className="form-button">
                    <i className="bi bi-play-circle-fill"></i>
                </button>
            </form>
        </>
    );
}
