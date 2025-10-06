const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  if (err instanceof SyntaxError && err.status == 400) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid JSON at body' }
    });
  }

  if (err.name === 'SequelizeValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation error',
        details: errors
      }
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const fields = err.errors.map(e => e.path);
    return res.status(409).json({
      success: false,
      error: { message: `${fields.join(', ')} already in use` }
    });
  }

  if (err.name === 'SequelizeDatabaseError' && err.parent?.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      error: { message: 'Duplicate entry' }
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: { message: 'Invalid token' }
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: { message: 'Expired token' }
    });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: { message: 'Very large payload' }
    });
  }

  // default error
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Route not found' }
  });
};

export { errorHandler, notFound };
