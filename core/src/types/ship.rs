macro_rules! export_types {
    ( $($p: ident,)* ) => {
        $(
            mod $p;
            pub use $p::*;
        )*
    };
}

export_types!(
	ship_class,
	fit_class,
	player_ship,
);