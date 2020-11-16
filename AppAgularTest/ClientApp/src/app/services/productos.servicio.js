"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosService = void 0;
var core_1 = require("@angular/core");
var ProductosService = /** @class */ (function () {
    function ProductosService(http, BaseUrl) {
        this.http = http;
        this.baseUrl = '';
        this.baseUrl = BaseUrl;
    }
    ProductosService.prototype.getProducto = function () {
        return this.http.get(this.baseUrl + "api/Producto/listProductos");
    };
    ProductosService.prototype.getProductoFiltro = function (nombre) {
        return this.http.get(this.baseUrl + "api/Producto/listProductosFiltro/" + nombre);
    };
    ProductosService.prototype.getProductoCategoria = function (idCategoria) {
        return this.http.get(this.baseUrl + "api/Producto/listProductosCategoria/" + idCategoria);
    };
    ProductosService.prototype.recuperarProducto = function (id) {
        return this.http.get(this.baseUrl + "api/Producto/recuperarProducto/" + id);
    };
    ProductosService.prototype.guardar = function (producto) {
        return this.http.post(this.baseUrl + "api/Producto/guardarProducto", producto);
    };
    ProductosService.prototype.eliminar = function (id) {
        return this.http.get(this.baseUrl + "api/Producto/eliminarProducto/" + id);
    };
    ProductosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(1, core_1.Inject("BASE_URL"))
    ], ProductosService);
    return ProductosService;
}());
exports.ProductosService = ProductosService;
//# sourceMappingURL=productos.servicio.js.map