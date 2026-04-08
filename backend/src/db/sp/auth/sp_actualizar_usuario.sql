CREATE OR REPLACE FUNCTION sp_actualizar_usuario(
    p_id UUID,
    p_nombre VARCHAR,
    p_contrasena VARCHAR,
    p_rol VARCHAR
) 
RETURNS TABLE (id UUID, nombre VARCHAR, rol VARCHAR, activo BOOLEAN) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    UPDATE usuarios 
    SET nombre = COALESCE(p_nombre, usuarios.nombre), 
        contrasena = COALESCE(p_contrasena, usuarios.contrasena),
        rol = COALESCE(CAST(p_rol AS rol_enum), usuarios.rol)
    WHERE usuarios.id = p_id
    RETURNING usuarios.id, usuarios.nombre, usuarios.rol::VARCHAR, usuarios.activo;
END;
$$;
