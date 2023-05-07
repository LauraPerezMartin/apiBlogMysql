//listamos todos los posts con los datos del autor
const getAll = () => {
    return db.query('SELECT p.* , a.nombre, a.email, a.imagen FROM blog.posts AS p, blog.autores AS a WHERE p.autor_Id = a.id');
};

const getById = (postId) => {
    return db.query('SELECT p.* , a.nombre, a.email, a.imagen FROM blog.posts AS p, blog.autores AS a WHERE p.id=? AND p.autor_Id = a.id', [postId]);
};
const getByAutorId = (autorId) => {
    return db.query('SELECT p.* , a.nombre, a.email, a.imagen FROM blog.posts AS p, blog.autores AS a  WHERE autor_id=? AND p.autor_Id = a.id', [autorId]);
};

const getPostByAutorId = (autorId) => {
    return db.query('SELECT * FROM posts WHERE autor_id=?', [autorId]);
};

const create = ({ titulo, descripcion, categoria, autor_id }) => {
    return db.query('INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?,?,?,?)', [titulo, descripcion, categoria, autor_id]);

};

const update = (postId, { titulo, descripcion, fecha_creacion, categoria, autor_id }) => {
    return db.query('UPDATE posts SET titulo=?, descripcion=?, fecha_creacion=?, categoria=?, autor_id=? WHERE id=?', [titulo, descripcion, fecha_creacion, categoria, autor_id, postId]);
};

const deleteById = (postId) => {
    return db.query('DELETE FROM posts WHERE id=?', [postId]);
};

module.exports = {
    getAll, getById, create, update, deleteById, getByAutorId, getPostByAutorId
}