import InputError from "@/Components/InputError";
import React from "react";

export default function CreateProjectForm() {
    return (
        <>
            <h2>New Floock</h2>
            <form method="post">
                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                    <InputError message={"why"} />
                </div>
                <button>Submit</button>
            </form>
        </>
    );
}
