export const errorHandler = (error, req, res, next) => {
        const { status = 500, message = 'Sever ERROR' } = error;
        res.status(500).json({
            status,
            message,
        });
}