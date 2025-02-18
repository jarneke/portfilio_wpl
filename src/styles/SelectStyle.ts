export const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderRadius: "none",
        backgroundColor: "transparent",
        border: "none",
        borderBottom: "2px solid #bedbff",
        boxShadow: "none",
        color: "#bedbff",
        "&:hover": {
            borderBottom: "2px solid #bedbff",
        },
    }),
    option: ({ data }: any) => ({
        backgroundColor: "#262626",
        margin: "0.5rem",
        padding: "0.5rem",
        borderRadius: "0.5rem",
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: "#171717",
    }),
    multiValue: (provided: any, { data }: any) => ({
        ...provided,
        borderRadius: "0.5rem",
        backgroundColor: "#171717",
    }),
    multiValueLabel: (provided: any, { data }: any) => ({
        ...provided,
        color: "#bedbff",
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: "white", // Remove button icon color
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.2)", // Darken on hover
        },
    }),
};