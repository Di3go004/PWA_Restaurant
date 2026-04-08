CREATE OR REPLACE FUNCTION sp_crear_usuario(
    p_nombre VARCHAR,
    p_contrasena VARCHAR,
    p_rol VARCHAR
) 
RETURNS TABLE (id UUID, nombre VARCHAR, rol VARCHAR) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    INSERT INTO usuarios (nombre, contrasena, rol)
    VALUES (p_nombre, p_contrasena, CAST(p_rol AS rol_enum))
    RETURNING usuarios.id, usuarios.nombre, usuarios.rol::VARCHAR;
END;
$$;
