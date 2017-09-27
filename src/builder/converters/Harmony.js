import generate from 'babel-generator';
import { TOKEN_TYPES } from 'shared/constants';

export const importDeclarationConverter = ({ node }) => 'import from' + generate(node.source).code;

export const exportNamedDeclarationConverter = ({ node }) => `export ${getExportedTokenName(node)}`;

export const exportDefaultDeclarationConverter = ({ node }) =>
    `export default ${getExportedTokenName(node)}`;

const getExportedTokenName = ({ declaration }) => {
    if (
        [TOKEN_TYPES.FUNCTION_DECLARATION, TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION].indexOf(
            declaration.type
        ) !== -1
    ) {
        return declaration.id ? declaration.id.name : 'function';
    }

    if (declaration.type === TOKEN_TYPES.VARIABLE_DECLARATION) {
        return declaration.declarations[0].id.name;
    }

    if (declaration.type === TOKEN_TYPES.IDENTIFIER) {
        return declaration.name;
    }
};

export const classDeclarationConverter = ({ node }) => {
    return `class ${generate(node.id).code} ${node.superClass
        ? ` extends ${node.superClass.name}`
        : ''}`;
};