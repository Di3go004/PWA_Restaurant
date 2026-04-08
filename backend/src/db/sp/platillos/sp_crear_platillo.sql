CREATE OR REPLACE FUNCTION sp_crear_platillo(
    p_nombre VARCHAR,
    p_descripcion TEXT,
    p_precio DECIMAL
) 
RETURNS UUID 
LANGUAGE plpgsql
AS $$
DECLARE
    v_nuevo_id UUID;
BEGIN
    INSERT INTO platillos (nombre, descripcion, precio)
    VALUES (p_nombre, p_descripcion, p_precio)
    RETURNING id INTO v_nuevo_id;

    RETURN v_nuevo_id;
END;
$$;
