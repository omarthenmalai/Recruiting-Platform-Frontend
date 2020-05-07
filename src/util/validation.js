import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

export function email(value) {
    return value && !isEmail(value.trim()) ? 'Invalid email' : null;
}

export function number(value) {
    return value && !isMobilePhone(value.trim(), 'en-US') ? 'Invalid Phone Number' : null;
}

function isDirty(value) {
    return value || value === 0;
}

export function required(requiredFields, values) {
    return requiredFields.reduce(
        (fields, field) => ({
            ...fields,
            ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
        }),
        {},
    );
}