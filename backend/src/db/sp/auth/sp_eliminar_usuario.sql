CREATE OR REPLACE FUNCTION sp_eliminar_usuario(
    p_id UUID
) 
-- ¡Cambiamos a RETURNS TABLE para devolver los datos que afectamos!
RETURNS TABLE (id UUID, nombre VARCHAR) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    UPDATE usuarios 
    SET activo = false
    WHERE usuarios.id = p_id
    -- RETURNING atrapa el registro que acaba de ser modificado
    RETURNING usuarios.id, usuarios.nombre; 
END;
$$;
