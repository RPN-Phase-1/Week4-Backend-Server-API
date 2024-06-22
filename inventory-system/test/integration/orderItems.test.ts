describe('Order routes', () => {
  describe('POST /v1/orders', () => {
    it('should return created (201) and succesfully create the order');
    it('should return bad request (400) if some of body  parts is missing');
  });

  describe('GET /v1/orders/:orderId', () => {
    it('should return ok (200) and succesfully get the order details');
  });

  describe('PUT /v1/orders/:orderId', () => {
    it('should return ok (200) and succesfully updated the order');
    it('should return not found (404) if user trying modified non-existent order');
  });

  describe('DELETE /v1/orders/:orderId', () => {
    it('should return ok (200) and succesfully deleted the order');
  });
});
