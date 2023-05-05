const getAll = () => {
    return db.query('SELECT * FROM autores');
};

const getById = (autorId) => {
    return db.query('SELECT * FROM autores WHERE id=?', [autorId]);
};

const create = ({ nombre, email, imagen }) => {
    return db.query('INSERT INTO autores (nombre, email, imagen) VALUES (?,?,?)', [nombre, email, imagen]);
};

const update = (autorId, { nombre, email, imagen }) => {
    return db.query('UPDATE autores SET nombre=?, email=?, imagen=? WHERE id=?', [nombre, email, imagen, autorId]);
};

const deleteById = (autorId) => {
    return db.query('DELETE FROM autores WHERE id=?', [autorId]);
};

module.exports = {
    getAll, getById, create, update, deleteById
}