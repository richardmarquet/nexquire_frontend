interface FormPopoverValues {
    value: string;
    label: string;
}

const UserTypesArr = ["super admin", "admin", "user"] as const;
type UserTypes = typeof UserTypesArr[number];


export { type FormPopoverValues, type UserTypes, UserTypesArr};