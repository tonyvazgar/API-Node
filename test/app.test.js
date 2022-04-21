describe("[APP] Esta es la prueba general", () => {
    test("Esto deberia retornar 10", () => {
        const a = 8;
        const b = 2;
        const total = a + b;
        expect(total).toEqual(10);
    });
});