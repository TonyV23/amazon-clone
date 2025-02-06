class User {
  final int? id;
  final String name;
  final String email;
  final String password;
  final String address;
  final String type;
  final String token;

// class constructor
  User(
      {required this.id,
      required this.name,
      required this.email,
      required this.password,
      required this.address,
      required this.type,
      required this.token});

  @override
  String toString() => '$name ';

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "name": name,
      "email": email,
      "password": password,
      "address": address,
      "type": type,
      "token": token,
    };
  }

  static User fromJson(Map<String, dynamic> json) {
    return User(
        id: json['id'] as int?,
        name: json['name'] as String,
        email: json['email'] as String,
        password: json['password'] as String,
        address: json['address'] as String,
        type: json['type'] as String,
        token: json['token'] as String);
  }

  User copy({
    int? id,
    String? name,
    String? email,
    String? password,
    String? address,
    String? type,
    String? token,
  }) {
    return User(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      password: password ?? this.password,
      address: address ?? this.address,
      type: type ?? this.type,
      token: token ?? this.token,
    );
  }
}
