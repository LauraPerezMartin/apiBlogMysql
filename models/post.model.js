const getAll = () => {
    return db.query('SELECT * FROM posts');
};

const getById = (postId) => {
    return db.query('SELECT * FROM posts WHERE id=?', [postId]);
};
const getByAutorId = (autorId) => {
    return db.query('SELECT * FROM posts WHERE autor_id=?', [autorId]);
}

const create = ({ titulo, descripcion, categoria, autor_id }) => {
    return db.query('INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?,?,?,?)', [titulo, descripcion, categoria, autor_id]);

};
const update = (postId, { titulo, descripcion, fecha_creacion, categoria, autor_id }) => {
    return db.query('UPDATE posts SET titulo=?, descripcion=?, fecha_creacion=?, categoria=?, autor_id=? WHERE id=?', [titulo, descripcion, fecha_creacion, categoria, autor_id, postId]);
}

const deleteById = (postId) => {
    return db.query('DELETE FROM posts WHERE id=?', [postId]);
}

module.exports = {
    getAll, getById, create, update, deleteById, getByAutorId
}